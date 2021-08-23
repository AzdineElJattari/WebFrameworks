package edu.ap.jdbc; // HEEL BELANGRIJK OM CORRECT TE ZETTEN MET JAVA PROJECTS ONDERAAN VSCODE
/**
 * Grade
 */
public class Grade {
    private String firstName;
    private String lastName;
    private int grade;

    public Grade(String firstName, String lastName, int grade) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
    }

    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public int getGrade() {
        return grade;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setGrade(int grade) {
        this.grade = grade;
    }
}