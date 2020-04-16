package com.ers.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ers.model.Reimbursement;
import com.ers.service.ErsServices;

@WebServlet(urlPatterns = {"/decisionReimbursement"})
@MultipartConfig
public class DecisionReimbursement extends HttpServlet {
	
	ErsServices erss = new ErsServices();

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		erss.ReimbursementDecisionService(Integer.parseInt(req.getParameter("reimb_id")),Integer.parseInt(req.getParameter("new_status_reimb")));
		
		
//		Part filePart = req.getPart("fileReceipt"); // Retrieves <input type="file" name="file">
//	    String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
//	    InputStream fileContent = filePart.getInputStream();
//	    System.out.println("length of the file");
//	    System.out.println(fileContent.available());

	}

}