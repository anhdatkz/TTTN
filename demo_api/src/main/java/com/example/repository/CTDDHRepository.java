package com.example.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entities.CTDDH;
import com.example.entities.CTDDHKeys;


@Repository
public interface CTDDHRepository extends JpaRepository<CTDDH, CTDDHKeys>{
	@Query("select ctddh from CTDDH ctddh where ctddh.id.maddhctdh = :maddh")
	public List<CTDDH> getCTDHByMaDH(@Param("maddh") String maddh);
}
