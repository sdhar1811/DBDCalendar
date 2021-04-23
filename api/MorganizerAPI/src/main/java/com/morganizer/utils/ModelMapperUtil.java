package com.morganizer.utils;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

public class ModelMapperUtil {

	public static <S, T> List<T> mapList(List<S> sourceList, Class<T> targetClass) {
		List<T> targetList=null;
		try {
			ModelMapper modelMapper = new ModelMapper();
			targetList = new ArrayList<>();
			for (S source : sourceList) {
				targetList.add(modelMapper.map(source, targetClass));
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		return targetList;
	}

}
