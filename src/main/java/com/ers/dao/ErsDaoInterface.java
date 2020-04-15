package com.ers.dao;

import java.util.List;

public interface ErsDaoInterface <U,R> {

	U Authentication(String username, String password);
	List<R> GetAllReimbursement(int id);
	boolean AddReimbursement(R r);
}
