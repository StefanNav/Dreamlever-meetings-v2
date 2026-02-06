"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  NotificationFilters,
  NotificationList,
  NotificationSettingsModal,
} from "@/components/notifications";
import {
  mockNotifications,
  defaultNotificationPreferences,
} from "@/lib/notifications-data";
import type {
  Notification,
  NotificationFilterType,
  NotificationStatusFilter,
  NotificationPreferences,
} from "@/types/notifications";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
}: NotificationsDrawerProps) {
  // State
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [typeFilter, setTypeFilter] = useState<NotificationFilterType>("all");
  const [statusFilter, setStatusFilter] =
    useState<NotificationStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (typeFilter !== "all" && notification.type !== typeFilter) {
        return false;
      }
      if (statusFilter === "unread" && notification.isRead) {
        return false;
      }
      if (statusFilter === "read" && !notification.isRead) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesPrimary = notification.primaryText
          .toLowerCase()
          .includes(query);
        const matchesContext = notification.contextText
          .toLowerCase()
          .includes(query);
        if (!matchesPrimary && !matchesContext) {
          return false;
        }
      }
      return true;
    });
  }, [notifications, typeFilter, statusFilter, searchQuery]);

  // Counts
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handlers
  const handleSelect = useCallback((id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        setSelectedIds(new Set(filteredNotifications.map((n) => n.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [filteredNotifications]
  );

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const handleMarkSelectedAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => (selectedIds.has(n.id) ? { ...n, isRead: true } : n))
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleDelete = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
  }, [selectedIds]);

  const handleSavePreferences = useCallback(
    (newPrefs: NotificationPreferences) => {
      setPreferences(newPrefs);
    },
    []
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[420px] max-w-[90vw] bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <div>
                  <h2 className="text-lg font-semibold text-heading-1">
                    Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {unreadCount} unread
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close notifications"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-scroll px-6 py-4">
                {/* Filters */}
                <div className="mb-4">
                  <NotificationFilters
                    typeFilter={typeFilter}
                    statusFilter={statusFilter}
                    searchQuery={searchQuery}
                    onTypeChange={setTypeFilter}
                    onStatusChange={setStatusFilter}
                    onSearchChange={setSearchQuery}
                  />
                </div>

                {/* Bulk Actions */}
                {selectedIds.size > 0 && (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-surface rounded-xl border border-border-light">
                    <span className="text-sm text-text-secondary">
                      {selectedIds.size} selected
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMarkSelectedAsRead}
                        className="gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Mark as read
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}

                {/* Notification List */}
                <NotificationList
                  notifications={filteredNotifications}
                  selectedIds={selectedIds}
                  onSelect={handleSelect}
                  onSelectAll={handleSelectAll}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <NotificationSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteSelected}
        title="Delete notifications"
        description={`Are you sure you want to delete ${selectedIds.size} notification${selectedIds.size === 1 ? "" : "s"}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
}
