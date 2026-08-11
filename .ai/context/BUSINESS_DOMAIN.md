# BUSINESS_DOMAIN

## Domain summary

Fashion Pets PZ is a pet grooming and care operations business focused on canine and feline customers.

The project goal is to replace manual scheduling and fragmented operational tracking with a centralized digital management platform.

## Primary business users

- Administrator
- Receptionist
- Groomer / Stylist
- Accountant

## Primary operational goals

- Reduce dependency on a manual appointment book.
- Improve daily schedule visibility.
- Prevent overbooking and staff overload.
- Track customers and multiple pets reliably.
- Improve payment, reminders, and reporting workflows.
- Enable future digital expansion without rebuilding the core system.

## Core domain concepts

### Customer

A customer owns one or more pets and is the primary contact for appointments, reminders, and payment tracking.

### Pet

A pet has profile information and business-relevant history, including breed, size, age, allergies, behavior, photos, notes, and prior visits.

### Service

A service is a grooming-related offering such as bath, haircut, grooming package, cleaning, or treatment.

### Appointment

An appointment is a scheduled service event tied to a pet, customer, staff member, time slot, duration, and lifecycle status.

### Staff availability

Each staff member may have custom schedules, blocked periods, holidays, vacations, and capacity constraints.

### Payment

Payments represent money collected, deposit handling, payment methods, and financial accountability for services rendered.

## Core business rules already known

- One customer may have multiple pets.
- Appointment duration can vary according to service, breed, size, and possibly behavior.
- Capacity control is required to avoid overload.
- The system must support recurring appointments.
- Appointment states matter operationally and should be tracked explicitly.
- Deposits, cancellations, and no-shows are part of the business workflow.
- The system must work on mobile and desktop via responsive web.

## Business rules still to be clarified

- Full service catalog and pricing rules.
- Exact duration formula for different pet/service combinations.
- Cancellation and refund policy.
- Rules for no-show penalties.
- Waitlist prioritization logic.
- Whether support for multiple branches is a real near-term requirement.
- Retention rules for photos and sensitive notes.

## MVP boundaries

The MVP is an internal operations system.

Included in MVP:

- Customer and pet management.
- Scheduling and availability.
- Appointment lifecycle handling.
- Payments and basic reporting.
- Users, roles, and permissions.
- Exports and backups.

Excluded from MVP by default:

- Native mobile app.
- Advanced automation dependencies for core flow.
- Customer self-service booking.
- Official WhatsApp integration as a hard dependency.
- Electronic invoicing.
- Inventory and loyalty system.

## Key operational risks

- Overly complex scheduling rules without clear source definitions.
- Scope creep from second-phase requests.
- Weak permission handling for sensitive or financial actions.
- Under-specified reporting needs leading to data redesign.
- Dependency selection that creates legal or deployment constraints.
