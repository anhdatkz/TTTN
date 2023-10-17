package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.CTDDH;
import com.example.entities.CTDDHKeys;
import com.example.repository.CTDDHRepository;

@Service
public class CTDDHService {
	@Autowired
	private CTDDHRepository ctddhRepository;
	
	public List<CTDDH> listAll(){
		return (List<CTDDH>)ctddhRepository.findAll();
	}
	
	public void save(CTDDH ctddh){
		ctddhRepository.save(ctddh);
	}
	
	public List<CTDDH> getCTDDHByIdDDH(String maddh){
		return (List<CTDDH>) ctddhRepository.getCTDHByMaDH(maddh);
	}
	
	public Boolean exitsById(CTDDHKeys ctddhKeys){
		return ctddhRepository.existsById(ctddhKeys);
	}
}
