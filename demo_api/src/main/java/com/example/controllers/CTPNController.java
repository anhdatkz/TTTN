package com.example.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.CTPN;
import com.example.entities.CTPNKeys;
import com.example.entities.DatHang;
import com.example.entities.LoaiSanPham;
import com.example.entities.PhieuNhap;
import com.example.payload.ApiResponse;
import com.example.payload.CTPNRequest;
import com.example.payload.CTPNResponse;
import com.example.service.CTPNService;
import com.example.service.DatHangService;
import com.example.service.LoaiSanPhamService;
import com.example.service.PhieuNhapService;

@RestController
@RequestMapping("/api/v1")
public class CTPNController {
	@Autowired
	private CTPNService ctpnService;
	
	@Autowired
	private LoaiSanPhamService loaiSanPhamService;
	
	@Autowired
	private PhieuNhapService phieuNhapService;
	
	@GetMapping("/ctpn")
	public List<CTPN> getAllCTPN() {
		return this.ctpnService.listAll();
	}

//	@GetMapping("/ctdh/{iddh}")
//	public List<CTDH> getCTGHByIdDH(@PathVariable Integer iddh) {
//		return this.ctdhService.getCTDHByIdGH(iddh);
//	}
	
	@GetMapping("/ctpn/{mapn}")
	public List<CTPNResponse> getCTGHByIdDH(@PathVariable String mapn) {
		List<CTPN> ctpns =ctpnService.getCTPNByIdPN(mapn);
		List<CTPNResponse> ctpnResponses = new ArrayList<CTPNResponse>();
		
		for(CTPN ctpn : ctpns){
			LoaiSanPham lsp = loaiSanPhamService.getLoaiSanPhamById(ctpn.getLoaiSanPhamCTPN().getMaloai());
			CTPNResponse CTPNResponse  = new CTPNResponse();
			CTPNResponse.setMapn(ctpn.getId().getMapnctpn());
			CTPNResponse.setTenloai(lsp.getTenloai());
			CTPNResponse.setAnh(lsp.getAnh());
			CTPNResponse.setSoluong(ctpn.getSoluong());
			CTPNResponse.setDongia(ctpn.getDongia());
			CTPNResponse.setTongtien(ctpn.getSoluong() * ctpn.getDongia());
			ctpnResponses.add(CTPNResponse);
		}
		
		return ctpnResponses;
	}

//	@PostMapping("/CTPN")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	public CTPN saveCTDH(@RequestBody CTPN CTPN) {
//		this.CTPNService.save(CTPN);	
//		return CTPN;
//	}
	
	@PostMapping("/ctpn")
	@PreAuthorize("hasRole('ROLE_THUKHO')")
	public ResponseEntity<ApiResponse> saveCTPN(@RequestBody CTPNRequest CTPNRequest) {
		try {
			CTPN CTPN = new CTPN();
			CTPNKeys CTPNKeys = new CTPNKeys();
			PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(CTPNRequest.getMapn());
			LoaiSanPham loaiSanPham = loaiSanPhamService.getLoaiSanPhamById(CTPNRequest.getMaloai());
			
			CTPNKeys.setMapnctpn(CTPNRequest.getMapn());;
			CTPNKeys.setMaloaictpn(CTPNRequest.getMaloai());
			
			if(ctpnService.exitsById(CTPNKeys)){
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Sản phẩm đã tồn tại!"),
	                    HttpStatus.OK);
			}
			CTPN.setPhieuNhap(phieuNhap);;
			CTPN.setLoaiSanPhamCTPN(loaiSanPham);
			CTPN.setId(CTPNKeys);
			CTPN.setSoluong(CTPNRequest.getSoluong());
			CTPN.setDongia(CTPNRequest.getDongia());
			this.ctpnService.save(CTPN);
			return new ResponseEntity(new ApiResponse(true, "Nhập hàng thành công"), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Nhập hàng thất bại!"),
                    HttpStatus.BAD_REQUEST);
		}
	}
}
