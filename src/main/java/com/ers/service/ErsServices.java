package com.ers.service;

import java.util.List;

import com.ers.dao.ErsDAO;
import com.ers.model.Reimbursement;
import com.ers.model.User;

public class ErsServices {
	
	ErsDAO ersdao = new ErsDAO();
	
	public User AuthenticationService(String username,String password) {
		return ersdao.Authentication(username, password);
	}
	
	public List<Reimbursement> ReimbursementService(int id) {
		return ersdao.GetAllReimbursement(id);
	}

}
