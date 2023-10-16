package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.NhaCC;
import com.example.service.NhaCCService;

@RestController
@RequestMapping("/api/v1")
public class NhaCCController {
	@Autowired
	private NhaCCService nhaCCService;
	
	@GetMapping("/nhacc")
	public List<NhaCC> getAllNhaCC(){
		return nhaCCService.listAll();
	}
}
