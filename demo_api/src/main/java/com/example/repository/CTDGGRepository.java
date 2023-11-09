package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.CTGiamGia;
import com.example.entities.CTGiamGiaKeys;

@Repository
public interface CTDGGRepository extends JpaRepository<CTGiamGia, CTGiamGiaKeys>{

}
