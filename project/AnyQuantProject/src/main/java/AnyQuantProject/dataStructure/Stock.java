/**
 * 
 */
package AnyQuantProject.dataStructure;

/**
 * @author G
 *
 */
public class Stock extends AbstractStock{
	double turnover;	//换手率
	double pe;			//市盈率
	double pb;			//市净率
	
	public double getTurnover() {
		return turnover;
	}
	public double getPe() {
		return pe;
	}
	public double getPb() {
		return pb;
	}
	public void setTurnover(double turnover) {
		this.turnover = turnover;
	}
	public void setPe(double pe) {
		this.pe = pe;
	}
	public void setPb(double pb) {
		this.pb = pb;
	}
	
	

}
