package com.example.payload;

import java.util.Date;

public class PhieuNhapRequest {
	private String mapn;
	private Date ngaylap;
	private String manvnhap;
	private String maddh;
	
	public String getMapn() {
		return mapn;
	}
	public void setMapn(String mapn) {
		this.mapn = mapn;
	}
	public Date getNgaylap() {
		return ngaylap;
	}
	public void setNgaylap(Date ngaylap) {
		this.ngaylap = ngaylap;
	}
	public String getManvnhap() {
		return manvnhap;
	}
	public void setManvnhap(String manvnhap) {
		this.manvnhap = manvnhap;
	}
	public String getMaddh() {
		return maddh;
	}
	public void setMaddh(String maddh) {
		this.maddh = maddh;
	}
	
}
