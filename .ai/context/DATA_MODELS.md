# DATA_MODELS

## Purpose

This file provides the shared domain model vocabulary for humans and agents.

It is not the final schema, but it defines the core entities expected by the system.

## Core entities

### User

Represents an authenticated system user.

Suggested attributes:

- id
- name
- email
- roleId
- activeStatus
- createdAt
- updatedAt

### Role

Represents a named access role such as administrator, receptionist, groomer, or accountant.

Suggested attributes:

- id
- name
- description

### Customer

Represents the pet owner or responsible contact.

Suggested attributes:

- id
- fullName
- phone
- email
- notes
- createdAt
- updatedAt

### Pet

Represents an animal linked to one customer.

Suggested attributes:

- id
- customerId
- name
- species
- breed
- size
- weight
- age
- birthDate
- allergies
- behaviorNotes
- observations
- activeStatus
- createdAt
- updatedAt

### PetPhoto

Represents stored media associated with a pet.

Suggested attributes:

- id
- petId
- storagePath
- caption
- createdAt

### Service

Represents a grooming or care offering.

Suggested attributes:

- id
- name
- description
- baseDurationMinutes
- activeStatus

### ServiceRule

Represents configurable logic modifiers for service duration, capacity, or eligibility.

Suggested attributes:

- id
- serviceId
- breed
- size
- behaviorFactor
- durationAdjustmentMinutes
- notes

### StaffSchedule

Represents recurring or dated work availability for a staff member.

Suggested attributes:

- id
- userId
- dayOfWeek
- startTime
- endTime
- effectiveFrom
- effectiveTo

### AvailabilityBlock

Represents blocked time such as holiday, vacation, manual closure, or personal unavailability.

Suggested attributes:

- id
- userId
- startAt
- endAt
- reason

### Appointment

Represents a scheduled service event.

Suggested attributes:

- id
- customerId
- petId
- serviceId
- assignedUserId
- startAt
- endAt
- durationMinutes
- status
- depositAmount
- cancellationReason
- noShowFlag
- notes
- createdAt
- updatedAt

### AppointmentStatusHistory

Represents the lifecycle history of an appointment.

Suggested attributes:

- id
- appointmentId
- oldStatus
- newStatus
- changedByUserId
- changedAt
- note

### WaitingListEntry

Represents a customer/pet waiting for an earlier or newly available slot.

Suggested attributes:

- id
- customerId
- petId
- preferredDateRange
- preferredServiceId
- priorityNote
- status
- createdAt

### Payment

Represents a recorded payment.

Suggested attributes:

- id
- appointmentId
- amount
- method
- status
- reference
- receivedAt
- createdByUserId

### AuditLog

Represents a critical action trail for traceability.

Suggested attributes:

- id
- actorUserId
- entityType
- entityId
- action
- metadata
- createdAt

## Relationship notes

- One customer can have many pets.
- One pet can have many appointments.
- One appointment belongs to one pet, one customer, and one service.
- One user can have many assigned appointments.
- One appointment can have multiple status history entries.
- One appointment may have zero or more payments depending on business design.

## Modeling reminders

- Preserve auditability for important status and payment changes.
- Prefer explicit status fields plus historical records for lifecycle entities.
- Avoid encoding complex business policy only in the database.
- Keep the schema ready for future reporting needs.
