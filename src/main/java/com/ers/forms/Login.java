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
import com.google.gson.GsonBuilder;

@WebServlet(urlPatterns = {"/login"})
@MultipartConfig
public class Login extends HttpServlet {
	
	ErsServices erss = new ErsServices();
	GsonBuilder gsonBuilder  = new GsonBuilder();
	
	// Allowing the serialization of static fields    



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
	    out.print(gson.toJson(userLogin).toString());
	    out.flush();  
	} else {
        out.print(gson.toJson(null).toString());
        out.flush();  
	}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.getWriter().print("ok");
	}


}
