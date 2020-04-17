package com.ers.servlets;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.ers.service.ErsServices;
import com.google.gson.Gson;


@WebServlet(urlPatterns = {"/getReceipt"})
@MultipartConfig
public class GetReceiptServlet extends HttpServlet {
	
	ErsServices erss = new ErsServices();
    Gson gson = new Gson();	

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		InputStream is = erss.getReceiptService(Integer.parseInt(req.getParameter("reimb_id")));
		byte[] array = is.readAllBytes();
		PrintWriter out = resp.getWriter();
	    resp.setContentType("application/json");
	    resp.setCharacterEncoding("UTF-8");
	    out.print(gson.toJson(array));
	    out.flush();  
	}
}