import static com.ers.config.EnvConfig.PASSWORD;
import static com.ers.config.EnvConfig.URL;
import static com.ers.config.EnvConfig.USERNAME;
import static org.junit.Assert.assertTrue;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.ers.service.ErsServices;
import com.ers.servlets.Login;

public class JUnitTest {

	  
	  ErsServices erss = new ErsServices();
	  @Test
	  public void testServer() {
	    try {
	      Connection conn = DriverManager.getConnection(URL,USERNAME,PASSWORD);
	      System.out.println(conn.isClosed());
	      assertTrue(conn.isClosed() == false);
	    } catch (SQLException e) {
	      // TODO Auto-generated catch block
	      e.printStackTrace();
	    }
	  }
	  
	  @Test
	  public void authenticationTest() {
	    assertTrue(erss.AuthenticationService("kamal_employee", "password") != null);
	  }

}
