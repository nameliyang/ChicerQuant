package blTest.klineBLTest;

import static org.junit.Assert.*;

import java.util.Calendar;

import org.junit.Before;
import org.junit.Test;

import AnyQuantProject.bl.factoryBL.KLineBLFactory;
import AnyQuantProject.blService.kLineBLService.BenchmarkKLineBLService;
import AnyQuantProject.util.method.CalendarHelper;

/**
* AnyQuantProject/blTest.klineBLTest/BenchmarkKLineBLImplTest.java
* @author cxworks
* 2016年5月3日 下午6:58:48
*/
public class BenchmarkKLineBLImplTest {
	BenchmarkKLineBLService service;
	Calendar min=CalendarHelper.getPreviousYear(Calendar.getInstance());
	
	
	Calendar max=Calendar.getInstance();
	String name="hs300";

	@Before
	public void setUp() throws Exception {
		service=KLineBLFactory.getBenchmarkBLService();
	}

	@Test
	public void testDayKLineChart() {
		assertNotNull(service.dayKLineChart(name, min, max));
	}

	@Test
	public void testWeekKLineChart() {
		assertNotNull(service.weekKLineChart(name));
	}

	@Test
	public void testMonthKLineChart() {
		assertNotNull(service.monthKLineChart(name));
	}

	@Test
	public void testGetDayAverageLine() {
		assertNotNull(service.getDayAverageLine(name, min, max, 5));
	}

	@Test
	public void testGetWeekAverageLine() {
		assertNotNull(service.getWeekAverageLine(name, 5));
	}

	@Test
	public void testGetMonthAverageLine() {
		assertNotNull(service.getMonthAverageLine(name, 5));
	}

}
