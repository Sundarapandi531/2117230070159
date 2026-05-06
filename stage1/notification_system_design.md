# Stage 1

## Approach

Notifications are prioritised using:
1. Notification Type Weight
2. Recency

Priority Order:
Placement > Result > Event

Latest notifications are prioritised within the same type.

## Algorithm

1. Fetch notifications from API
2. Assign weights
3. Sort notifications using:
   - Type weight descending
   - Timestamp descending
4. Return top 10 notifications

## Efficient Maintenance

For real-time incoming notifications,
a Min Heap / Priority Queue of size 10
can efficiently maintain the top notifications.

Whenever a new notification arrives:
1. Compare with smallest priority item
2. Replace if higher priority
3. Heap operations take O(log n)

## Complexity

Sorting:
O(n log n)

Heap Optimization:
O(log 10)