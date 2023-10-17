package com.example.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.DatHang;
import com.example.entities.NhaCC;
import com.example.entities.NhanVien;
import com.example.entities.PhieuNhap;
import com.example.payload.ApiResponse;
import com.example.payload.DatHangRequest;
import com.example.payload.PhieuNhapRequest;
import com.example.service.DatHangService;
import com.example.service.NhanVienService;
import com.example.service.PhieuNhapService;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class PhieuNhapController {
	@Autowired
	private PhieuNhapService phieuNhapService;
	
	@Autowired
	private DatHangService datHangService;
	
	@Autowired
	private NhanVienService nhanVienService;
	
	@GetMapping("/phieunhap")
	public List<PhieuNhap> getAllPhieuNhap(){
		return this.phieuNhapService.listAll();
	}
	
//	@PostMapping("/phieunhap")
//	public void savePhieuNhap(@RequestBody PhieuNhap phieuNhap){
//		this.phieuNhapService.save(phieuNhap);
//	}
	@PostMapping("/phieunhap")
	@PreAuthorize("hasRole('ROLE_THUKHO')")
	public ResponseEntity<ApiResponse> savePhieuNhap(@RequestBody PhieuNhapRequest phieuNhapRequest){
		if(phieuNhapService.exitsByMaPN(phieuNhapRequest.getMapn())){
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Mã phiếu nhập đã tồn tại!"),
                    HttpStatus.OK);
		}
		PhieuNhap phieuNhap = new PhieuNhap();
		DatHang datHangPN = datHangService.getDathangById(phieuNhapRequest.getMaddh());
		NhanVien nhanVienPN = nhanVienService.getNhanVienById(phieuNhapRequest.getManvnhap());
		phieuNhap.setMapn(phieuNhapRequest.getMapn());
		phieuNhap.setDatHangPN(datHangPN);
		phieuNhap.setNhanVienPN(nhanVienPN);
		phieuNhap.setNgaynhap(phieuNhapRequest.getNgaylap());
		
		this.phieuNhapService.save(phieuNhap);
		return new ResponseEntity(new ApiResponse(true, "Tạo phiếu nhập mới thành công!"), HttpStatus.OK);
	}
	
	@GetMapping("/phieunhap/{id}")
	public ResponseEntity<PhieuNhap> getPhieuNhapById(@PathVariable String id){
		try {
			PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(id);
			return new ResponseEntity<PhieuNhap>(phieuNhap, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			return new ResponseEntity<PhieuNhap>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/phieunhap/{id}")
	public ResponseEntity<PhieuNhap> updatePhieuNhap(@RequestBody PhieuNhap phieuNhap,
			@PathVariable String id){
		try {
			PhieuNhap phieuNhapExist = phieuNhapService.getPhieuNhapById(id);
			phieuNhapService.save(phieuNhap);
			return new ResponseEntity<PhieuNhap>(phieuNhap, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			return new ResponseEntity<PhieuNhap>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/phieunhap/{id}")
	public void deletePhieuNhapById(@PathVariable String id){
		phieuNhapService.deletePhieuNhapById(id);
	}
}
