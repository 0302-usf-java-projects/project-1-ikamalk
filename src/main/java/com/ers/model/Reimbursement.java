package com.ers.model;

public class Reimbursement {
	private int reimb_id;
	private double reimb_amount;
	private String reimb_submitted;
	private String reimb_resolved;
	private String reimb_description;
	private String reimb_receipt;
	private String reimb_author;
	private String reimb_resolver;
	private int reimb_status_id;
	private int reimb_type_id;
	
	
	
	
	@Override
	public String toString() {
		return "Reimbursement [reimb_id=" + reimb_id + ", reimb_amount=" + reimb_amount + ", reimb_submitted="
				+ reimb_submitted + ", reimb_resolved=" + reimb_resolved + ", reimb_description=" + reimb_description
				+ ", reimb_receipt=" + reimb_receipt + ", reimb_author=" + reimb_author + ", reimb_resolver="
				+ reimb_resolver + ", reimb_status_id=" + reimb_status_id + ", reimb_type_id=" + reimb_type_id + "]";
	}
	public Reimbursement() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Reimbursement(int reimb_id, double reimb_amount, String reimb_submitted, String reimb_resolved,
			String reimb_description, String reimb_receipt, String reimb_author, String reimb_resolver,
			int reimb_status_id, int reimb_type_id) {
		super();
		this.reimb_id = reimb_id;
		this.reimb_amount = reimb_amount;
		this.reimb_submitted = reimb_submitted;
		this.reimb_resolved = reimb_resolved;
		this.reimb_description = reimb_description;
		this.reimb_receipt = reimb_receipt;
		this.reimb_author = reimb_author;
		this.reimb_resolver = reimb_resolver;
		this.reimb_status_id = reimb_status_id;
		this.reimb_type_id = reimb_type_id;
	}
	
	
	//add Reimbursement
	public Reimbursement(double reimb_amount, String reimb_description, String reimb_receipt, String reimb_author, int reimb_type_id) {
		super();
		this.reimb_amount = reimb_amount;
		this.reimb_description = reimb_description;
		this.reimb_receipt = reimb_receipt;
		this.reimb_author = reimb_author;
		this.reimb_type_id = reimb_type_id;
	}
	public int getReimb_id() {
		return reimb_id;
	}
	public void setReimb_id(int reimb_id) {
		this.reimb_id = reimb_id;
	}
	public double getReimb_amount() {
		return reimb_amount;
	}
	public void setReimb_amount(double reimb_amount) {
		this.reimb_amount = reimb_amount;
	}
	public String getReimb_submitted() {
		return reimb_submitted;
	}
	public void setReimb_submitted(String reimb_submitted) {
		this.reimb_submitted = reimb_submitted;
	}
	public String getReimb_resolved() {
		return reimb_resolved;
	}
	public void setReimb_resolved(String reimb_resolved) {
		this.reimb_resolved = reimb_resolved;
	}
	public String getReimb_description() {
		return reimb_description;
	}
	public void setReimb_description(String reimb_description) {
		this.reimb_description = reimb_description;
	}
	public String getReimb_receipt() {
		return reimb_receipt;
	}
	public void setReimb_receipt(String reimb_receipt) {
		this.reimb_receipt = reimb_receipt;
	}
	public String getReimb_author() {
		return reimb_author;
	}
	public void setReimb_author(String reimb_author) {
		this.reimb_author = reimb_author;
	}
	public String getReimb_resolver() {
		return reimb_resolver;
	}
	public void setReimb_resolver(String reimb_resolver) {
		this.reimb_resolver = reimb_resolver;
	}
	public int getReimb_status_id() {
		return reimb_status_id;
	}
	public void setReimb_status_id(int reimb_status_id) {
		this.reimb_status_id = reimb_status_id;
	}
	public int getReimb_type_id() {
		return reimb_type_id;
	}
	public void setReimb_type_id(int reimb_type_id) {
		this.reimb_type_id = reimb_type_id;
	}
}
