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
import com.example.payload.ApiResponse;
import com.example.payload.DatHangRequest;
import com.example.service.DatHangService;
import com.example.service.NhaCCService;
import com.example.service.NhanVienService;



@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class DatHangController {
	@Autowired
	private DatHangService datHangService;
	
	@Autowired
	private NhaCCService nhaCCService;
	
	@Autowired
	private NhanVienService nhanVienService;
	
	@GetMapping("/dathang")
	public List<DatHang> getAllDatHang(){
		return this.datHangService.listAll();
	}
	
//	@PostMapping("/dathang")
//	public void saveDatHang(@RequestBody DatHang datHang){
//		this.datHangService.save(datHang);
//	}
	
	@PostMapping("/dathang")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ApiResponse> saveDatHang(@RequestBody DatHangRequest datHangRequest){
		if(datHangService.exitsByMaDDH(datHangRequest.getMaddh())){
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Mã DDH đã tồn tại!"),
                    HttpStatus.OK);
		}
		DatHang datHang = new DatHang();
		NhaCC nhaCC = nhaCCService.getNhaCCById(datHangRequest.getManhacc());
		NhanVien nhanVienDH = nhanVienService.getNhanVienById(datHangRequest.getManvlap());
		datHang.setMaddh(datHangRequest.getMaddh());
		datHang.setNgaylap(datHangRequest.getNgaylap());
		datHang.setNhaCCDH(nhaCC);
		datHang.setNhanVienDH(nhanVienDH);
		this.datHangService.save(datHang);
		return new ResponseEntity(new ApiResponse(true, "Thêm DDH mới thành công!"), HttpStatus.OK);
	}
	
	@GetMapping("/dathang/{id}")
	public ResponseEntity<DatHang> getDatHangById(@PathVariable String id){
		try {
			DatHang datHang = datHangService.getDathangById(id);
			return new ResponseEntity<DatHang>(datHang, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			return new ResponseEntity<DatHang>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/dathang/{id}")
	public ResponseEntity<DatHang> updateDatHang(@RequestBody DatHang datHang,
			@PathVariable String id){
		try {
			DatHang datHangExist = datHangService.getDathangById(id);
			datHangService.save(datHang);
			return new ResponseEntity<DatHang>(datHang, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			return new ResponseEntity<DatHang>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/dathang/{id}")
	public void deleteDatHangById(@PathVariable String id){
		datHangService.deleteDatHangById(id);
	}
}
