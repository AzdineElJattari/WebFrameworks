<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="edu.ap.jdbc.*" %>
<%@ page import="java.util.ArrayList" %>

<% 
JDBConnection connection = null;

try {
	// extract values from POST
	String firstName = request.getParameter("firstName");
	String lastName = request.getParameter("lastName");
	int grade = Integer.parseInt(request.getParameter("grade"));
	
	// open connection and insert values
	connection = JDBConnection.getJDBConnection();
	connection.openConnection("Students", "root", "root");
	String insertSQL = "INSERT INTO GRADES(firstname, lastname, grade) " +
		"VALUES('" + firstName + "','" + lastName + "'," + grade + ");";
	//System.out.println(insertSQL);
	connection.executeInsert(insertSQL);

	response.sendRedirect("list.jsp");
}
catch(Exception e) {
	System.out.println(e);
}
finally {
	connection.closeConnection();
}
%>
