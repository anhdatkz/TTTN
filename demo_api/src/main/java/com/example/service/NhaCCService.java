package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.NhaCC;
import com.example.entities.Rom;
import com.example.repository.NhaCCRepository;

@Service
public class NhaCCService {
	@Autowired
	private NhaCCRepository nhaCCRepository;
	
	public List<NhaCC> listAll(){
		return (List<NhaCC>)nhaCCRepository.findAll();
	}
	
	public void save(NhaCC nhaCC){
		nhaCCRepository.save(nhaCC);
	}
	
	public NhaCC getNhaCCById(String maNhaCC){
		return nhaCCRepository.getById(maNhaCC);
	}
	
}
