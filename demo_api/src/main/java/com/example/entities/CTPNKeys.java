package com.example.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class CTPNKeys implements Serializable{
	@Column(name="MAPN")
	String mapnctpn;
	@Column(name="MALOAI")
	String maloaictpn;
	public CTPNKeys() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getMapnctpn() {
		return mapnctpn;
	}
	public void setMapnctpn(String mapnctpn) {
		this.mapnctpn = mapnctpn;
	}
	public String getMaloaictpn() {
		return maloaictpn;
	}
	public void setMaloaictpn(String maloaictpn) {
		this.maloaictpn = maloaictpn;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((maloaictpn == null) ? 0 : maloaictpn.hashCode());
		result = prime * result + ((mapnctpn == null) ? 0 : mapnctpn.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CTPNKeys other = (CTPNKeys) obj;
		if (maloaictpn == null) {
			if (other.maloaictpn != null)
				return false;
		} else if (!maloaictpn.equals(other.maloaictpn))
			return false;
		if (mapnctpn == null) {
			if (other.mapnctpn != null)
				return false;
		} else if (!mapnctpn.equals(other.mapnctpn))
			return false;
		return true;
	}
	
	
}
