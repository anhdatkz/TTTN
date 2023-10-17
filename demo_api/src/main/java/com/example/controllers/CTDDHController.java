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

import com.example.entities.CTDDH;
import com.example.entities.CTDDHKeys;
import com.example.entities.DatHang;
import com.example.entities.LoaiSanPham;
import com.example.payload.ApiResponse;
import com.example.payload.CTDDHRequest;
import com.example.payload.CTDDHResponse;
import com.example.payload.CTDHResponse;
import com.example.service.CTDDHService;
import com.example.service.DatHangService;
import com.example.service.LoaiSanPhamService;

@RestController
@RequestMapping("/api/v1")
public class CTDDHController {
	@Autowired
	private CTDDHService ctddhService;
	
	@Autowired
	private LoaiSanPhamService loaiSanPhamService;
	
	@Autowired
	private DatHangService datHangService;
	
	@GetMapping("/ctddh")
	public List<CTDDH> getAllCTDDH() {
		return this.ctddhService.listAll();
	}

//	@GetMapping("/ctdh/{iddh}")
//	public List<CTDH> getCTGHByIdDH(@PathVariable Integer iddh) {
//		return this.ctdhService.getCTDHByIdGH(iddh);
//	}
	
	@GetMapping("/ctddh/{idddh}")
	public List<CTDDHResponse> getCTGHByIdDH(@PathVariable String idddh) {
		List<CTDDH> ctddhs = ctddhService.getCTDDHByIdDDH(idddh);
		List<CTDDHResponse> ctddhResponses = new ArrayList<CTDDHResponse>();
		
		for(CTDDH ctddh : ctddhs){
			LoaiSanPham lsp = loaiSanPhamService.getLoaiSanPhamById(ctddh.getId().getMaloaictdh().trim());
			CTDDHResponse ctddhResponse  = new CTDDHResponse();
			ctddhResponse.setMaddh(ctddh.getId().getMaddhctdh());
			ctddhResponse.setTenloai(lsp.getTenloai());
			ctddhResponse.setAnh(lsp.getAnh());
			ctddhResponse.setSoluong(ctddh.getSoluong());
			ctddhResponse.setDongia(ctddh.getDongia());
			ctddhResponse.setTongtien(ctddh.getSoluong() * ctddh.getDongia());
			ctddhResponses.add(ctddhResponse);
		}
		
		return ctddhResponses;
	}

//	@PostMapping("/ctddh")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	public CTDDH saveCTDH(@RequestBody CTDDH ctddh) {
//		this.ctddhService.save(ctddh);	
//		return ctddh;
//	}
	
	@PostMapping("/ctddh")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ApiResponse> saveCTDDH(@RequestBody CTDDHRequest ctddhRequest) {
		try {
			CTDDH ctddh = new CTDDH();
			CTDDHKeys ctddhKeys = new CTDDHKeys();
			DatHang datHang = datHangService.getDathangById(ctddhRequest.getMaddh());
			LoaiSanPham loaiSanPham = loaiSanPhamService.getLoaiSanPhamById(ctddhRequest.getMaloai());
			
			ctddhKeys.setMaddhctdh(ctddhRequest.getMaddh());
			ctddhKeys.setMaloaictdh(ctddhRequest.getMaloai());
			
			if(ctddhService.exitsById(ctddhKeys)){
				return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Sản phẩm đã tồn tại!"),
	                    HttpStatus.OK);
			}
			ctddh.setDatHangCTDH(datHang);
			ctddh.setLoaiSanPhamCTDH(loaiSanPham);
			ctddh.setId(ctddhKeys);
			ctddh.setSoluong(ctddhRequest.getSoluong());
			ctddh.setDongia(ctddhRequest.getDongia());
			this.ctddhService.save(ctddh);
			return new ResponseEntity(new ApiResponse(true, "Thêm DDH sản phẩm thành công"), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Thêm DDH sản phẩm thất bại!"),
                    HttpStatus.BAD_REQUEST);
		}
	}
}
