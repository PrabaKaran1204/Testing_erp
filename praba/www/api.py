# # CUSTOM CHECKIN/OUT BUTTON FOR EMPLOYEE CHECKIN


# import frappe
# from frappe.utils import now, get_datetime
# import datetime
# from dateutil import parser
# from datetime import datetime


# # EMPLOYYEE CHECKIN RECORD

# @frappe.whitelist()
# def create_checkin(checkin_time):
#     employee_id = frappe.session.user  
#     # checkin_time = get_datetime(checkin_time)  
#     doc = frappe.get_doc({
#         "doctype": "Employee Checkin",
#         "employee": employee_id,
#         # "check_in": checkin_time,
#         "log_type": "IN"
#     })
#     doc.insert()


# from frappe.utils import time_diff_in_seconds
# from datetime import timezone

#  # Check if the datetime is naive, Make it UTC aware , If already aware, return as is

# def make_timezone_aware(dt):
#     """Ensure the datetime object is timezone-aware."""
#     if dt.tzinfo is None:  
#         return dt.replace(tzinfo=timezone.utc)  
#     return dt  

# # Use dateutil to parse the string into a datetime object
# def parse_datetime(dt_str):
#     """Convert string to datetime."""
#     try:
#         return parser.parse(dt_str)
#     except (ValueError, TypeError):
#         raise ValueError(f"Invalid datetime string: {dt_str}")


# # Convert string inputs to datetime objects to calculate total hours
# def calculate_total_hours(checkin_time, checkout_time):
#     if isinstance(checkin_time, str):
#         checkin_time = parse_datetime(checkin_time)
#     if isinstance(checkout_time, str):
#         checkout_time = parse_datetime(checkout_time)

# # Ensure both checkin_time and checkout_time are timezone-aware
#     checkin_time = make_timezone_aware(checkin_time)
#     checkout_time = make_timezone_aware(checkout_time)

# # Now calculate the time difference in seconds
#     total_seconds = time_diff_in_seconds(checkout_time, checkin_time)
#     hours = total_seconds // 3600  
#     print(hours)
#     minutes = (total_seconds % 3600) // 60  
#     print(minutes)
    
    
#     return f"{int(hours)} : {int(minutes)} "


# # CREATE CHECKOUT

# @frappe.whitelist()
# def create_checkout(checkin_time, checkout_time):
   
#     employee_id = frappe.session.user


#     checkin_doc = frappe.get_all("Employee Checkin", filters={"employee": employee_id, "check_out_time": None}, limit=1)

#     print("Checkin Document:", checkin_doc)

#     if checkin_doc:
#         doc = frappe.get_doc("Employee Checkin", checkin_doc[0].name)
#         print("Document Value:", doc)
#         doc.check_out_time = checkout_time
#         print("mistake time",checkout_time)
#         total_hours = calculate_total_hours(checkin_time, checkout_time)
#         doc.total_hours_worked = total_hours
#         doc.log_type = "OUT"

#         # Save the document
#         try:
#             doc.save()
#             print("Document saved successfully.")
#         except Exception as e:
#             print("Error saving document:", str(e))
#             raise  

#         return total_hours



# # RESET WHEN EMPLOYEE NOT CHECKOUT

# @frappe.whitelist()
# def reset_checkin_status():
#     checkins = frappe.get_all("Employee Checkin", filters={"check_out_time": ["is", "null"]})
#     for checkin in checkins:
#         checkin_doc = frappe.get_doc("Employee Checkin", checkin.name)
#         checkin_doc.check_out_time = now()  
#         total_hours = calculate_total_hours(checkin_doc.check_in, checkin_doc.check_out)
#         checkin_doc.total_hours_worked = total_hours
#         checkin_doc.save()
        
        
"============================="

# CUSTOM CHECKIN/OUT BUTTON FOR EMPLOYEE CHECKIN


import frappe
from frappe.utils import now, get_datetime
import datetime
from dateutil import parser
from datetime import datetime


from frappe.utils import time_diff_in_seconds
from datetime import timezone

# EMPLOYYEE CHECKIN RECORD

@frappe.whitelist()
def create_checkin(checkin_time):
    employee_id = frappe.session.user  
    # checkin_time = get_datetime(checkin_time)  
    doc = frappe.get_doc({
        "doctype": "Employee Checkin",
        "employee": employee_id,
        # "check_in": checkin_time,
        "log_type": "IN"
    })
    doc.insert()



 # Check if the datetime is naive, Make it UTC aware , If already aware, return as is

def make_timezone_aware(dt):
    """Ensure the datetime object is timezone-aware."""
    if dt.tzinfo is None:  
        return dt.replace(tzinfo=timezone.utc)  
    return dt  

# Use dateutil to parse the string into a datetime object
def parse_datetime(dt_str):
    """Convert string to datetime."""
    try:
        return parser.parse(dt_str)
    except (ValueError, TypeError):
        raise ValueError(f"Invalid datetime string: {dt_str}")


# Convert string inputs to datetime objects to calculate total hours
def calculate_total_hours(checkin_time,checkout_time):
    if isinstance(checkin_time, str):
        checkin_time = parse_datetime(checkin_time)
    if isinstance(checkout_time, str):
        checkout_time = parse_datetime(checkout_time)

# Ensure both checkin_time and checkout_time are timezone-aware
    checkin_time = checkin_time
    checkout_time = checkout_time
    # print("TIME AWARE")
    # print("CHECKINTIME",checkin_time)
    # print("CHECKOUTTIME",checkout_time)



# Now calculate the time difference in seconds
    total_seconds = time_diff_in_seconds(checkout_time, checkin_time)
    hours = total_seconds // 3600  
    # print("HOURSSSSS",hours)
    minutes = (total_seconds % 3600) // 60  
    # print("MINSSSSSS",minutes)
    
    
    return f"{int(hours)} : {int(minutes)} "


# CREATE CHECKOUT

@frappe.whitelist()
def create_checkout(checkin_time, checkout_time):
   
    employee_id = frappe.session.user


    checkin_doc = frappe.get_all("Employee Checkin", filters={"employee": employee_id, "check_out_time": None}, limit=1)

    print("Checkin Document:", checkin_doc)

    if checkin_doc:
        doc = frappe.get_doc("Employee Checkin", checkin_doc[0].name)
        # print("checkIN:", doc.time)
        # print("checkOut:", checkout_time)
        checkin_time_str = doc.time
        checkout_time_str = checkout_time
        doc.check_out_time = checkout_time
        # print("mistake time",checkout_time)
        # print("type",type(checkin_time_str))
        # print("type",type(checkout_time_str))


        # TIME1 = datetime.strptime(checkin_time_str, "%Y-%m-%d %H:%M:%S")
        TIME2 = datetime.strptime(checkout_time_str, "%Y-%m-%d %H:%M:%S")
        # print("et1",checkin_time_str)
        # print("et",TIME2)

        # Calculate the time difference
        total_hours = TIME2 - checkin_time_str
        total_time = convert_duration_to_hours_minutes(str(total_hours))
        doc.total_hours_worked = total_time
        doc.log_type = "OUT"

        # Save the document
        try:
            doc.save()
            print("Document saved successfully.")
        except Exception as e:
            print("Error saving document:", str(e))
            raise  

        return total_hours

def convert_duration_to_hours_minutes(total_hours):
    # Split the duration string into hours, minutes, and seconds
    hours, minutes, seconds = total_hours.split(':')
    
    # Create the output string in "HH:MM" format
    formatted_duration = f"{int(hours):02} Hrs : {int(minutes):02} Mins"
    
    return formatted_duration

# RESET WHEN EMPLOYEE NOT CHECKOUT

@frappe.whitelist()
def reset_checkin_status():
    checkins = frappe.get_all("Employee Checkin", filters={"check_out_time": ["is", "null"]})
    for checkin in checkins:
        checkin_doc = frappe.get_doc("Employee Checkin", checkin.name)
        checkin_doc.check_out_time = now()  
        total_hours = calculate_total_hours(checkin_doc.check_in, checkin_doc.check_out)
        checkin_doc.total_hours_worked = total_hours
        checkin_doc.save()