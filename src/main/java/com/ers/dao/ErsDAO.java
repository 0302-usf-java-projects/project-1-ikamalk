package com.ers.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ers.config.ConnectionUtil;
import com.ers.model.Reimbursement;
import com.ers.model.User;

public class ErsDAO implements ErsDaoInterface<User,Reimbursement> {
	
	User user = new User();

	@Override
	public User Authentication(String username, String password) {
		try(Connection conn = ConnectionUtil.connect()) {  
		String sql = "select * from ers_users where ers_username='"+username+"' and ers_password= '"+password+"';\r\n";
	       PreparedStatement ps = conn.prepareStatement(sql);
	       ResultSet b=ps.executeQuery();
	       if(b.next()) {
	    	   User newUser = new User(b.getInt(1),b.getString(2),b.getString(3),b.getString(4),b.getString(5),b.getString(6),b.getInt(7));
		       ps.close();
	    	   return (newUser);
	       } else {
		       ps.close();
	         return null;
	       }
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Reimbursement> GetAllReimbursement(int id) {
		try(Connection conn = ConnectionUtil.connect()) {  
		String sql = "select * from ers_reimbursement INNER JOIN ers_users ON ers_users.ers_users_id = "+id;
	       PreparedStatement ps = conn.prepareStatement(sql);
	       ResultSet b=ps.executeQuery();
	       List<Reimbursement> myReimbursements = new ArrayList<Reimbursement>();
	       while(b.next()) {
	    	   myReimbursements.add(new Reimbursement(b.getInt(1),b.getDouble(2),b.getString(3),b.getString(4),b.getString(5),b.getString(6),b.getString(7),b.getString(8),b.getInt(9),b.getInt(10)));
	       }
		   ps.close();
	       return (myReimbursements);
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return null;
	}



}
