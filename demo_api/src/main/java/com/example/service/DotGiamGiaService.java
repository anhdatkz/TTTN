package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.DotGiamGia;
import com.example.repository.DotGiamGiaRepository;

@Service
public class DotGiamGiaService {
	@Autowired
	private DotGiamGiaRepository dotGiamGiaRepository;
	
	public List<DotGiamGia> listAll(){
		return (List<DotGiamGia>)dotGiamGiaRepository.findAll();
	}
}
