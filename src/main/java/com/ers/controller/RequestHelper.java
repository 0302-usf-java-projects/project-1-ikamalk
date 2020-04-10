package com.ers.controller;

import javax.servlet.http.HttpServletRequest;

public class RequestHelper {

	public static String process(HttpServletRequest req) {
		System.out.println(req.getRequestURI());
		switch(req.getRequestURI()) {
		case "/login":
			return "html/second.html";
		default:
			return "";
		}
	}
	
}
