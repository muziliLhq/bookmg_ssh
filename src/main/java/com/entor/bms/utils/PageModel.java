package com.entor.bms.utils;

import java.util.List;

public class PageModel<T> {
	private Integer pagesize;// 每页显示
	private Integer totalrows;// 总的记录数
	private Integer pagecount;// 总的页数
	private Integer pagenum;// 页码
	private Integer start;// 每页开始记录序号
	private Integer end;// 每页最后一条记录序号
	private List<T> list;// 保存记录的集合

	public Integer getPagesize() {
		return pagesize > 0 ? pagesize : 4;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}

	public Integer getTotalrows() {
		return totalrows >= 0 ? totalrows : 0;
	}

	public void setTotalrows(Integer totalrows) {
		this.totalrows = totalrows;
	}

	public Integer getPagecount() {
		if (getTotalrows() % getPagesize() == 0)
			return getTotalrows() / getPagesize();
		return getTotalrows() / getPagesize() + 1;
	}

	public Integer getPagenum() {
		return pagenum > 0 ? pagenum : 1;
	}

	public void setPagenum(Integer pagenum) {
		this.pagenum = pagenum;
	}

	public Integer getStart() {
		return getPagesize() * (getPagenum() - 1) + 1;
	}

	public Integer getEnd() {
		return getPagesize() * getPagenum();
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}
}
