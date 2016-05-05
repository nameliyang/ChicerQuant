package webProject.server.myHandler;

import java.io.BufferedInputStream;
import java.io.IOException;

import org.apache.commons.io.IOUtils;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;
import webProject.resources.Resources;

/**
* AnyQuantProject/webProject.server.myHandler/RootHandler.java
* @author cxworks
* 2016年5月3日 下午11:30:53
*/
public class HtmlHandler implements Handler<RoutingContext>{

	@Override
	public void handle(RoutingContext event) {
		String loc=event.request().getParam("html");
		try {
			String html=IOUtils.toString(new BufferedInputStream(Resources.class.getResourceAsStream(loc)));
			event.response().setChunked(true);
			event.response().putHeader("content-type", "text/html").write(html).end();
		} catch (IOException|NullPointerException e) {
			event.response().setChunked(true);
			event.response().end("resources unavaliable");
		}
	}

}