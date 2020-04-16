package com.ers.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
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
		password = getHashedPassword(username,password);		
		String sql = "select * from ers_users where ers_username= ? and ers_password= ?";
	       PreparedStatement ps = conn.prepareStatement(sql);
	       ps.setString(1, username);
	       ps.setString(2, password);
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
		String sql = "select * from ers_reimbursement INNER JOIN ers_users ON ers_users.ers_users_id = ?";
	       PreparedStatement ps = conn.prepareStatement(sql);
	       ps.setInt(1, id);
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

	@Override
	public boolean AddReimbursement(Reimbursement r) {
		try(Connection conn = ConnectionUtil.connect()) {  
			String sql = "insert into ers_reimbursement (reimb_amount,reimb_submitted,reimb_description,reimb_receipt,reimb_author,reimb_status_id,reimb_type_id) values(?,?,?,'',?,1,?)";
		       PreparedStatement ps = conn.prepareStatement(sql);
		       ps.setDouble(1, r.getReimb_amount());
		       //get current time
		       Timestamp now = new Timestamp(System.currentTimeMillis());
		       ps.setTimestamp(2, now);
		       ps.setString(3, r.getReimb_description());
		       ps.setString(4, r.getReimb_author());
		       ps.setInt(5, r.getReimb_type_id());
		       ps.execute();
			   ps.close();
			   System.out.println(r);
		       return true;
			}catch(SQLException e) {
				e.printStackTrace();
			}
		return false;
	}

	@Override
	public boolean ReimbursementDecision(int reimb_id, int newStatus) {
		try(Connection conn = ConnectionUtil.connect()){
			Statement s = conn.createStatement();
			String sql = "update ers_reimbursement set reimb_status_id = '"+newStatus+"' where reimb_id = "+reimb_id;
			int updated = s.executeUpdate(sql);
			s.close();
			return true;
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public String getHashedPassword(String username, String password) {
		try(Connection conn = ConnectionUtil.connect()){
		String sql = "{ ? = call HashPasswordFunc(?,?) }";
		CallableStatement cs = conn.prepareCall(sql);
		cs.registerOutParameter(1, Types.VARCHAR);
		cs.setString(2, username);
		cs.setString(3, password);
		cs.execute();
		String passwordHashed = cs.getString(1);
		cs.close();
		return passwordHashed;
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}



}
