package AnyQuantProject.bl.stockListBL;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.stream.Collectors;

import javax.naming.InitialContext;

import org.python.antlr.PythonParser.raise_stmt_return;
import org.python.modules.thread.thread;

import AnyQuantProject.blService.stockListBLService.StockListBLService;
import AnyQuantProject.data.factoryDATA.FactoryDATA;
import AnyQuantProject.dataService.factoryDATAService.FactoryDATAService;
import AnyQuantProject.dataService.realDATAService.singleStockDATAService.SingleStockDATAService;
import AnyQuantProject.dataService.realDATAService.stockListDATAService.StockListDATAService;
import AnyQuantProject.dataStructure.Exchange;
import AnyQuantProject.dataStructure.Stock;
import AnyQuantProject.util.constant.R;
import AnyQuantProject.util.method.CalendarHelper;
import AnyQuantProject.util.method.Checker;
import AnyQuantProject.util.method.IOHelper;

/** 
*AnyQuantProject//AnyQuantProject.bl.stockListBL//StockListBLController.java
* @author  cxworks 
* @date 创建时间：2016年3月2日 下午2:49:40 
*/

public class StockListBLController implements StockListBLService,Runnable {
	private List<String> avaliable;
        
//<<<<<<< HEAD
//        StockListDATAService stockListDATAService;
//	public StockListBLController() {
//		avaliable=new LinkedList<>();
//		// get dataService
//		FactoryDATAService factoryDATAService = FactoryDATA.getInstance();
//		stockListDATAService = factoryDATAService.getStockListDATAService();
//		// get names
//		List<String> sz = stockListDATAService.getAllStocks(Calendar.getInstance(), Exchange.SZ);
//		List<String> sh = stockListDATAService.getAllStocks(Calendar.getInstance(), Exchange.SH);
//		avaliable.addAll(sh);
//		avaliable.addAll(sz);
//=======
	private volatile List<Stock> stockData;
	private volatile boolean isAlive=false;
	
	
	public StockListBLController() {
		
		
	}
	
	public void init(){
		try {
			avaliable=(List<String>) IOHelper.read(R.CachePath, R.StockNameFile);
			if (avaliable==null) {
				throw new NullPointerException();
			}
		} catch (Exception e) {
			avaliable=new ArrayList<>();
			// get dataService
			FactoryDATAService factoryDATAService = FactoryDATA.getInstance();
			StockListDATAService stockListDATAService = factoryDATAService.getStockListDATAService();
			// get names
			List<String> sz = stockListDATAService.getAllStocks(Calendar.getInstance(), Exchange.SZ);
			List<String> sh = stockListDATAService.getAllStocks(Calendar.getInstance(), Exchange.SH);
			avaliable.addAll(sh);
			avaliable.addAll(sz);
			//save
			IOHelper.save(R.CachePath, R.StockNameFile, (Serializable) avaliable);
		}
		try{
			Calendar today=Calendar.getInstance();
			stockData=(List<Stock>) IOHelper.read(R.CachePath, CalendarHelper.getDate(today));
			if (stockData==null) {
				throw new NullPointerException();
			}
		}
		catch(NullPointerException e){
			stockData=new ArrayList<>();
			isAlive=true;
			Thread thread=new Thread(this);
			thread.start();
		}
	}

	@Override
	public List<Stock> getAllStocks() {

		if (isAlive) {
			
			return this.stockData;
		}
		else {
			return this.stockData;
		}

	}

	@Override
	public List<String> searchPredict(String target) {
		if (Checker.checkStringNotNull(target)) {
			return new ArrayList<>();
		}
		// get names
		List<String> ans=avaliable
				.stream()
				.filter(nam->nam.contains(target))
				.collect(Collectors.toList());
		return ans;
		
	}

	@Override
	public boolean searchLegal(String target) {
		return avaliable.contains(target);
	}

	@Override
	public void run() {
		
		try {
			Thread.sleep(50);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//
		FactoryDATAService factoryDATAService = FactoryDATA.getInstance();
		SingleStockDATAService singleStockDATAService=factoryDATAService.getSingleStockDATAService();
		Calendar c = Calendar.getInstance();
		avaliable.stream()
		.map(nam->singleStockDATAService.getOperation(nam, c))
		.forEach(st->stockData.add(st));
		//save
		IOHelper.save(R.CachePath, CalendarHelper.getDate(c), (Serializable) stockData);
		//
		isAlive=false;
	}

}
