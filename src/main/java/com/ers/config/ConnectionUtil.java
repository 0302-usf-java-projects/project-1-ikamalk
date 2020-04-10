package com.ers.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionUtil {
	
	
	static {
		try {
			Class.forName("org.postgresql.Driver");
		} catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static Connection connect() throws SQLException {
		return DriverManager.getConnection(
				"jdbc:postgresql://postres-doesnt-matter.cvlbfwidrytg.us-east-2.rds.amazonaws.com"+
						":5432/ers_db",
				"ers_project",
				"password"
				);
	}

}
