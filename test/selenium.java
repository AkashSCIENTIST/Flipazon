package selenium;
import org.testng.annotations.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Keys;

public class Selenium {
	public static void main(String[] args) {
		test1();
		}
	
	@Test
	public static void test1() {
		WebDriver driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.get("https://www.google.com/");
		
		WebElement textBox = driver.findElement(By.name("q"));
		textBox.clear();
		textBox.sendKeys("Translate LEO in tamil");
		textBox.sendKeys(Keys.ENTER);
		
		WebElement searchButton = driver.findElement(By.name("btnK"));
		searchButton.sendKeys(Keys.ENTER);
		
		try {
			driver.close();
			} catch (Exception e) {}
	}
}