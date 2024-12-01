// notificationManager.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailService, NotificationManager } from "./part3";

describe("NotificationManager", () => {
  let emailServiceMock;
  let notificationManager;

  beforeEach(() => {
    // ایجاد Mock برای EmailService
    emailServiceMock = {
      sendEmail: vi.fn(),
    };

    // ساخت نمونه NotificationManager با Mock
    notificationManager = new NotificationManager(emailServiceMock);
  });

  it("should send an email with the correct parameters", () => {
    // فراخوانی متد notifyUser
    const email = "user@example.com";
    const message = "You have a new notification!";
    notificationManager.notifyUser(email, message);

    // بررسی اینکه متد sendEmail با پارامترهای صحیح فراخوانی شده
    expect(emailServiceMock.sendEmail).toHaveBeenCalledWith(
      email,
      "Notification",
      `Dear user,\n\n${message}`
    );
  });

  it("should throw an error if email is missing", () => {
    expect(() => notificationManager.notifyUser("", "Test Message")).toThrow(
      "Email and message are required"
    );
  });

  it("should throw an error if message is missing", () => {
    expect(() =>
      notificationManager.notifyUser("user@example.com", "")
    ).toThrow("Email and message are required");
  });

  it("should call sendEmail only once", () => {
    const email = "user@example.com";
    const message = "You have a new notification!";
    notificationManager.notifyUser(email, message);

    // بررسی تعداد دفعات فراخوانی
    expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(1);
  });

  it("should log the email sending process using a spy", () => {
    // ایجاد یک Spy برای متد اصلی sendEmail
    const realEmailService = new EmailService();
    const sendEmailSpy = vi.spyOn(realEmailService, "sendEmail");

    // استفاده از نمونه واقعی EmailService
    const realNotificationManager = new NotificationManager(realEmailService);
    realNotificationManager.notifyUser(
      "user@example.com",
      "You have a new notification!"
    );

    // بررسی اینکه متد اصلی با پارامترهای صحیح فراخوانی شده است
    expect(sendEmailSpy).toHaveBeenCalledWith(
      "user@example.com",
      "Notification",
      "Dear user,\n\nYou have a new notification!"
    );

    // پاکسازی Spy
    sendEmailSpy.mockRestore();
  });
});
