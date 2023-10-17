package com.example.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="CTPN")
public class CTPN {
	@EmbeddedId
	private CTPNKeys id;
	private Integer soluong;
	private float dongia;
	
	@ManyToOne
	@MapsId("mapnctpn")
	@JoinColumn(name="mapn")
	private PhieuNhap phieuNhap;
	
	@ManyToOne
	@MapsId("maloaictpn")
	@JoinColumn(name="maloai")
	private LoaiSanPham loaiSanPhamCTPN;

	public CTPNKeys getId() {
		return id;
	}

	public void setId(CTPNKeys id) {
		this.id = id;
	}

	public Integer getSoluong() {
		return soluong;
	}

	public void setSoluong(Integer soluong) {
		this.soluong = soluong;
	}

	public float getDongia() {
		return dongia;
	}

	public void setDongia(float dongia) {
		this.dongia = dongia;
	}

	public PhieuNhap getPhieuNhap() {
		return phieuNhap;
	}

	public void setPhieuNhap(PhieuNhap phieuNhap) {
		this.phieuNhap = phieuNhap;
	}

	public LoaiSanPham getLoaiSanPhamCTPN() {
		return loaiSanPhamCTPN;
	}

	public void setLoaiSanPhamCTPN(LoaiSanPham loaiSanPhamCTPN) {
		this.loaiSanPhamCTPN = loaiSanPhamCTPN;
	}
	
	
}
