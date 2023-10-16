package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.CungCap;
import com.example.entities.CungCapKeys;
import com.example.repository.CungCapRepository;

@Service
public class CungCapService {
	@Autowired
	private CungCapRepository cungCapRepository;
	
	public List<CungCap> listAll(){
		return (List<CungCap>)cungCapRepository.findAll();
	}
	
	public void save(CungCap cungCap){
		cungCapRepository.save(cungCap);
	}
	
	public List<CungCap> getCungCapById(CungCapKeys cungCapKeys){
		return (List<CungCap>) cungCapRepository.getById(cungCapKeys);
	}
	
	public List<CungCap> getCungCapByMaNhaCC(String manhacc){
		return (List<CungCap>) cungCapRepository.getCungCapByMaNhaCC(manhacc);
	}
}
