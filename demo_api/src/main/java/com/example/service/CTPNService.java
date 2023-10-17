package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.CTPN;
import com.example.entities.CTPNKeys;
import com.example.repository.CTPNRepository;

@Service
public class CTPNService {
	@Autowired
	private CTPNRepository ctpnRepository;
	
	public List<CTPN> listAll(){
		return (List<CTPN>)ctpnRepository.findAll();
	}
	
	public void save(CTPN ctpn){
		ctpnRepository.save(ctpn);
	}
	
	public List<CTPN> getCTPNByIdPN(String mapn){
		return (List<CTPN>) ctpnRepository.getCTPNByMaPN(mapn);
	}
	
	public Boolean exitsById(CTPNKeys ctpnKeys){
		return ctpnRepository.existsById(ctpnKeys);
	}
}
