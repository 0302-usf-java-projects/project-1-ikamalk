package com.ers.config;
import static com.ers.config.EnvConfig.PASSWORD;
import static com.ers.config.EnvConfig.URL;
import static com.ers.config.EnvConfig.USERNAME;

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
				"jdbc:postgresql://postres-doesnt-matter.cvlbfwidrytg.us-east-2.rds.amazonaws.com:5432/ers_db",
				"ers_project",
				"password"
				);
	}
	
		  
		  
//		  public static Connection connect() throws SQLException {
//		    Connection conn = DriverManager.getConnection(URL,USERNAME,PASSWORD);
//		    return conn;
//		  }

}
