package com.ers.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ers.model.User;

@WebServlet(urlPatterns = {"/dashboard"})
public class DashboardServlet extends HttpServlet {
	
	User user = new User();
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		if(user.getRole_id() == 1) {
			RequestDispatcher view = req.getRequestDispatcher("html/dashboardManager.html");
			view.forward(req, resp);
		} else if (user.getRole_id() == 2) {
			RequestDispatcher view = req.getRequestDispatcher("html/dashboardEmployee.html");
			view.forward(req, resp);
		}
		
	}

}

