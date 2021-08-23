package edu.ap.jdbc; // HEEL BELANGRIJK OM CORRECT TE ZETTEN MET JAVA PROJECTS ONDERAAN VSCODE
import java.sql.*;
import java.util.ArrayList;

public class JDBConnection {
	
	private static JDBConnection instance = null;
	private Connection conn = null;
	
	private JDBConnection() {
		System.out.println("Instantiated");
	}
	
	public static JDBConnection getJDBConnection() {
		
		if(instance == null) {
            instance = new JDBConnection();
        }
        return instance;
	}
	
	public void openConnection(String database, String user, String pwd) {        

			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				// MySQL
				String url = "jdbc:mysql://127.0.0.1/" + database + "?serverTimezone=UTC";
				// SQLite
				// Warning! Move the 'Students.db' file out of the project dir and update 
				// the path in the connection string. Otherwise you will get a read-only error
				// because the file is under git control.
				//String url = "jdbc:sqlite:" + database + ".db";
			    conn = DriverManager.getConnection (url, user, pwd);
			    //System.out.println("Connection opened");
			} 
			catch (Exception e) {
				System.out.println(e);
			}
	}
	
	public void closeConnection() {
		
		try {
			conn.close();
			//System.out.println("Connection closed");
		}
		catch (Exception e) {
		    System.out.println(e);
		}
	}

	public void executeInsert(String sql) {
		
		try {
			Statement stmt = conn.createStatement();
			stmt.executeUpdate(sql);
			stmt.close();
		}
		catch(SQLException ex) {
			System.out.println("Error: " + ex);
		}
	}
	
	public ArrayList<Grade> executeSelect(String sql) {
		ResultSet rs = null;
		ArrayList<Grade> result = new ArrayList<Grade>();
		try {
			Statement stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()) {
				result.add(new Grade(rs.getString(1), rs.getString(2), rs.getInt(3)));
			}
			stmt.close();
		}
		catch(SQLException ex) {
			System.out.println("Error: " + ex);
		}
		
		return result;
	}
}