package com.ers.dao;

import java.io.InputStream;
import java.util.List;

public interface ErsDaoInterface <U,R> {

	U Authentication(String username, String password);
	String getHashedPassword(String username, String password);
	List<R> GetAllReimbursement(int id);
	boolean AddReimbursement(R r,InputStream file);
	boolean ReimbursementDecision(int reimb_id, int reimb);
	InputStream getReceipt(int reimb_id);
}
