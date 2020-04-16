package com.ers.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.ers.model.Reimbursement;
import com.ers.service.ErsServices;

@WebServlet(urlPatterns = {"/addReimbursement"})
@MultipartConfig
public class AddReimbursement extends HttpServlet {
	
	ErsServices erss = new ErsServices();

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(req.getParameter("authorReimbursement"));
		erss.AddReimbursementService(new Reimbursement(Double.parseDouble(req.getParameter("amountReimbursement")),req.getParameter("descriptionReimbursement"),"",
				req.getParameter("authorReimbursement"),Integer.parseInt(req.getParameter("typeReimbursement"))));
		
//		Part filePart = req.getPart("fileReceipt"); // Retrieves <input type="file" name="file">
//	    String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // MSIE fix.
//	    InputStream fileContent = filePart.getInputStream();
//	    System.out.println("length of the file");
//	    System.out.println(fileContent.available());

	}

}
