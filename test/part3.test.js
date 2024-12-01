// notificationManager.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailService, NotificationManager } from "./part3";

describe("NotificationManager", () => {
  let emailServiceMock;
  let notificationManager;

  beforeEach(() => {
    emailServiceMock = {
      sendEmail: vi.fn(),
    };

    notificationManager = new NotificationManager(emailServiceMock);
  });

  it("should send an email with the correct parameters", () => {
    const email = "user@example.com";
    const message = "You have a new notification!";
    notificationManager.notifyUser(email, message);

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

    expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(1);
  });

  it("should log the email sending process using a spy", () => {
    const realEmailService = new EmailService();
    const sendEmailSpy = vi.spyOn(realEmailService, "sendEmail");

    const realNotificationManager = new NotificationManager(realEmailService);
    realNotificationManager.notifyUser(
      "user@example.com",
      "You have a new notification!"
    );

    expect(sendEmailSpy).toHaveBeenCalledWith(
      "user@example.com",
      "Notification",
      "Dear user,\n\nYou have a new notification!"
    );

    sendEmailSpy.mockRestore();
  });
});

