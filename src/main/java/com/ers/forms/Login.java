package com.ers.forms;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ers.controller.RequestHelper;
import com.ers.model.User;
import com.ers.service.ErsServices;
import com.google.gson.Gson;

@WebServlet(urlPatterns = {"/login"})
@MultipartConfig
public class Login extends HttpServlet {
	
	ErsServices erss = new ErsServices();
	Gson gson = new Gson();

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	User userLogin = erss.AuthenticationService(req.getParameter("username"),req.getParameter("password"));
	 PrintWriter out = resp.getWriter();
     resp.setContentType("application/json");
     resp.setCharacterEncoding("UTF-8");
	if(userLogin !=null) {
		System.out.println("OK MADAFAKA !!!!!!!");
	    out.print(this.gson.toJson(userLogin).toString());
	    out.flush();  
	} else {
		System.out.println("NOOOOOOO !!!");
        out.print(this.gson.toJson(null).toString());
        out.flush();  
	}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.getWriter().print("ok");
	}


}
