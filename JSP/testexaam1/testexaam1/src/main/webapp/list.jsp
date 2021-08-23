<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="edu.ap.jdbc.*" %>
<%@ page import="java.util.ArrayList" %>
<% 
JDBConnection connection = null;
ArrayList<Grade> grades = null;

try {
	connection = JDBConnection.getJDBConnection();
	connection.openConnection("Students", "root", "root");
	
	String selectSQL = "SELECT * FROM GRADES;";
	grades = connection.executeSelect(selectSQL);
}
catch(Exception e) {
	System.out.println(e);
}
finally {
	connection.closeConnection();
}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>List grades</title>
</head>
<body>
<br/><br/>
<h2>Grade List</h2>
<table>
<tr>
	<td><b>First Name</b></td>
	<td><b>Last Name</b></td>
	<td><b>Grade</b></td>
</tr>
<%
	if(grades.size() > 0) {
		for(Grade g: grades) {
			out.println("<tr><td>" + g.getFirstName() + "</td><td>" 
									+ g.getLastName() + "</td><td>" 
									+ g.getGrade() + "</td></tr>");
		}
	}
%>
</table>
<% out.println("<br/><br/><a href='grade.jsp'>Grade</a>"); %>
</body>
</html>

