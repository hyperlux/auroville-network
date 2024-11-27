{editingService && (
  <ServiceForm
    service={editingService}
    onSubmit={handleEditService}
    onCancel={() => setEditingService(null)}
  />
)} 