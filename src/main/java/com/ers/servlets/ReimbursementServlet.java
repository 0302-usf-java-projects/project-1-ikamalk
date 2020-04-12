package com.ers.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ers.model.Reimbursement;
import com.ers.service.ErsServices;
import com.google.gson.Gson;
import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

@WebServlet(urlPatterns = {"/reimbursement"})
@MultipartConfig
public class ReimbursementServlet extends HttpServlet {
	
	ErsServices erss = new ErsServices();
	Gson gson = new Gson();

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	List<Reimbursement> myReimbursements = erss.ReimbursementService(Integer.parseInt(req.getParameter("id")));
	 PrintWriter out = resp.getWriter();
     resp.setContentType("application/json");
     resp.setCharacterEncoding("UTF-8");
	if(myReimbursements !=null) {
		Type listType = new TypeToken<List<Reimbursement>>() {}.getType();
		 Gson gson = new Gson();
		 String json = gson.toJson(myReimbursements, listType);
		 List<Reimbursement> target2 = gson.fromJson(json, listType);
		 System.out.println(json);
		 out.print(json);
		 out.flush();
	} else {
        out.print(this.gson.toJson(null).toString());
        out.flush();  
	}
	}
}
