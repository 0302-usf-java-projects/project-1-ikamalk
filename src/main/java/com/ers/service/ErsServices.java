package com.ers.service;

import java.io.InputStream;
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
	
	public boolean AddReimbursementService(Reimbursement newReimbursement,InputStream file) {
		return ersdao.AddReimbursement(newReimbursement,file);
	}
	
	public boolean ReimbursementDecisionService(int reimb_id,int decision) {
		return ersdao.ReimbursementDecision(reimb_id,decision);
	}
	
	public InputStream getReceiptService(int reimb_id) {
		return ersdao.getReceipt(reimb_id);
	}

}
