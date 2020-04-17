package com.ers.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.ers.controller.RequestHelper;
import com.ers.model.User;
import com.ers.service.ErsServices;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet(urlPatterns = {"/login"})
@MultipartConfig
public class Login extends HttpServlet {
	public static final Logger logger = Logger.getLogger(Login.class);
	ErsServices erss = new ErsServices();
	GsonBuilder gsonBuilder  = new GsonBuilder();
	


	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	User userLogin = erss.AuthenticationService(req.getParameter("username"),req.getParameter("password"));
	 PrintWriter out = resp.getWriter();
     resp.setContentType("application/json");
     resp.setCharacterEncoding("UTF-8");
     gsonBuilder.excludeFieldsWithModifiers(java.lang.reflect.Modifier.TRANSIENT);
	    // Creates a Gson instance based on the current configuration
	    Gson gson = gsonBuilder.create();	
	if(userLogin !=null) {
		logger.info(req.getParameter("username")+" successfuly loged !");
	    out.print(gson.toJson(userLogin).toString());
	    out.flush();  
	} else {
		logger.info("Wrong password or username");
        out.print(gson.toJson(null).toString());
        out.flush();  
	}
	}
	



}
