package com.ers.dao;


public interface ErsDaoInterface <U> {

	U Authentication(String username, String password);
}
